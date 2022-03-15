import base64
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import pandas as pd
from sklearn.cluster import KMeans
from scipy import cluster


pixel_type = (int, int, int)


def get_hex_color(color):
	return "#%02x%02x%02x" % color


def get_luminosity(pixel: pixel_type) -> float:
	return 0.5 * (max(pixel) + min(pixel))


def get_saturation(pixel: pixel_type) -> float:
	luminosity: float = get_luminosity(pixel)
	if luminosity < 1:
		return (max(pixel) - min(pixel)) / (1 - abs(2 * luminosity - 1))
	else:
		return 0


def get_best_pixel(pixels: [pixel_type]) -> pixel_type:
	# TODO I think that to get the "right" colors I need to be looking at either the groups found or the whole image

	METHOD: str = "MAX COLOR"

	best_pixel: pixel_type = pixels[0]
	pixel: pixel_type
	for pixel in pixels:
		if METHOD == "SATURATION":
			if get_saturation(pixel) > get_saturation(best_pixel):
				best_pixel = pixel
		elif METHOD == "MAX COLOR":
			if (max(pixel) - min(pixel)) > (max(best_pixel) - min(best_pixel)):
				best_pixel = pixel

	return best_pixel


def get_centroids(source_file: str, num_colors: int, whiten: bool, full: bool) -> [pixel_type]:
	pixel_data: [pixel_type] = list(Image.open(source_file).getdata())

	if not full:
		TARGET_POINTS: int = 600
		if len(pixel_data) > TARGET_POINTS:
			clump_size: int = int(len(pixel_data) / TARGET_POINTS)
			small_data: [pixel_type] = []
			i: int
			for i in range(0, len(pixel_data), clump_size):
				if i + clump_size < len(pixel_data):
					offset: int = i + clump_size
				else:
					offset: int = len(pixel_data) - 1
				clump: [pixel_type] = pixel_data[i:offset]
				small_data.append(get_best_pixel(clump))
			pixel_data = small_data

	df: pd.DataFrame = pd.DataFrame(pixel_data, columns=["red", "green", "blue"])

	if whiten:
		df["std_red"] = cluster.vq.whiten(df["red"])
		df["std_green"] = cluster.vq.whiten(df["green"])
		df["std_blue"] = cluster.vq.whiten(df["blue"])

	kmeans: KMeans = KMeans(n_clusters=num_colors)

	if whiten:
		kmeans.fit(df[["std_red", "std_green", "std_blue"]])
	else:
		kmeans.fit(df[["red", "green", "blue"]])

	centroids: [pixel_type] = list(kmeans.cluster_centers_)

	# TODO not sure what I was doing here
	if whiten:
		centroids = [tuple(centroid) for centroid in centroids]
	else:
		centroids = [tuple(map(round, centroid)) for centroid in centroids]

	if whiten:
		red_dev: float
		green_dev: float
		blue_dev: float
		red_dev, green_dev, blue_dev = df[["red", "green", "blue"]].std()
		i: int
		for i in range(len(centroids)):
			centroids[i] = round(centroids[i][0] * red_dev), round(centroids[i][1] * green_dev), round(centroids[i][2] * blue_dev)

	return centroids


def get_footer(footer_width: int, footer_height: int, centroids: [pixel_type], text: bool) -> Image:
	VERTICAL_PADDING: int = 0

	footer_img: Image = Image.new("RGB", (footer_width, footer_height), (255, 255, 255))
	tile_width: int = round(footer_width / (len(centroids) + 0.3) + 0.5)
	spacing: int = round((footer_width - tile_width * len(centroids)) / (len(centroids) - 1) + tile_width)
	tile_height: int = footer_height - 2 * VERTICAL_PADDING

	font: ImageFont = ImageFont.truetype("static/fonts/Roboto-Light.ttf", round(footer_height / 5))

	i: int
	color: pixel_type
	for i, color in enumerate(centroids):
		x_pos: int = i * spacing
		y_pos: int = VERTICAL_PADDING
		tile: Image = Image.new("RGB", (tile_width, tile_height), color)
		footer_img.paste(tile, (x_pos, y_pos))

		if text:
			text_color: int = round(((sum(color) / len(color)) + 127) % 255)
			draw: ImageDraw = ImageDraw.Draw(footer_img)
			draw.text((x_pos + 3, VERTICAL_PADDING), get_hex_color(color), (text_color,) * 3, font=font)

	return footer_img


def make_image(source_file: str, centroids, text) -> bytes:
	source_img: Image = Image.open(source_file)
	source_width: int
	source_height: int
	source_width, source_height = source_img.size
	out_height: int = round(source_height * 1.25)

	out_img: Image = Image.new("RGB", (source_width, out_height), (255, 255, 255))
	out_img.paste(source_img)

	footer_img: Image = get_footer(source_width, out_height - source_height, centroids, text)

	out_img.paste(footer_img, (0, source_height))

	buffered: BytesIO = BytesIO()
	out_img.save(buffered, format='png')
	return base64.b64encode(buffered.getvalue())


def post(source_file: str, num_colors: str, text, whiten: bool, full: bool) -> bytes:
	num_colors: int = int(num_colors)
	centroids: [pixel_type] = get_centroids(source_file, num_colors, whiten, full)
	return make_image(source_file, centroids, text)
