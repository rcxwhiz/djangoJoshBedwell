from enum import IntEnum
from django.db import models
from django.utils.translation import gettext_lazy as _


class Project(models.Model):
    order = models.IntegerField()
    name = models.CharField(max_length=200)
    language = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    source_code_link = models.CharField(max_length=200, blank=True)
    demo_link = models.CharField(max_length=200, blank=True)

    def __str__(self) -> str:
        return str(self.name)


class PreviousJob(models.Model):
    order = models.IntegerField()
    title = models.CharField(max_length=200)
    work_place = models.CharField(max_length=200)
    start_date = models.CharField(max_length=200)
    end_date = models.CharField(max_length=200)
    bullets = models.TextField(blank=True)

    def __str__(self) -> str:
        return f'{self.title} - {self.work_place}'


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    posted_date = models.DateField()
    edited_date = models.DateField()
    edited = models.BooleanField()
    published = models.BooleanField()
    tags = models.TextField(blank=True)
    content = models.TextField(blank=True)

    def __str__(self) -> str:
        return str(self.title)


class CourseTaken(models.Model):
    num = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.TextField()
    at_byu = models.BooleanField()
    was_ta = models.BooleanField()
    genre = models.CharField(max_length=200)

    def __str__(self) -> str:
        return str(self.num)


class FishTank(models.Model):
    name = models.CharField(max_length=200)
    gallons = models.FloatField()
    length = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()


class FishSpecies(models.Model):
    common_name = models.CharField(max_length=200)
    scientific_name = models.CharField(max_length=200)
    native_to = models.CharField(max_length=200)
    id_name = models.CharField(max_length=200)

    class Difficulty(models.TextChoices):
        EASY = 'EA', _('easy')
        MEDIUM = 'ME', _('medium')
        HARD = 'HA', _('hard')

    difficulty = models.CharField(
        max_length=2,
        choices=Difficulty.choices,
        default=Difficulty.EASY,
    )

    min_lifespan = models.FloatField()
    max_lifespan = models.FloatField()
    full_size_male = models.FloatField()
    full_size_female = models.FloatField()
    sexual_dimorphism = models.BooleanField()

    # TODO need to know how to get the names out of these enums
    class EaterType(models.TextChoices):
        HERBIVORE = 'HE', _('herbivore')
        OMNIVORE = 'OM', _('omnivore')
        CARNIVORE = 'CA', _('carnivore')

    eater_type = models.CharField(
        max_length=2,
        choices=EaterType.choices,
        default=EaterType.OMNIVORE,
    )

    class FlowLevel(models.TextChoices):
        LOW = 'LO', _('low')
        NORMAL = 'NO', _('normal')
        HIGH = 'HI', _('high')

    flow_level = models.CharField(
        max_length=2,
        choices=FlowLevel.choices,
        default=FlowLevel.NORMAL,
    )

    class TankOccupation(models.TextChoices):
        BOTTOM = 'BO', _('bottom')
        MIDDLE = 'MI', _('middle')
        TOP = 'TO', _('top')
        ALL = 'AL', _('all')

    tank_occupation = models.CharField(
        max_length=2,
        choices=TankOccupation.choices,
        default=TankOccupation.ALL,
    )

    class Substrate(models.TextChoices):
        GRAVEL = 'GR', _('gravel')
        SAND = 'SA', _('sand')
        ENRICHED = 'EN', _('enriched')
        ANY = 'AN', _('any')

    substrate = models.CharField(
        max_length=2,
        choices=Substrate.choices,
        default=Substrate.ANY,
    )

    class CoverLevel(models.TextChoices):
        MINIMAL = 'MI', _('minimal')
        NORMAL = 'NO', _('normal')
        EXTRA = 'EX', _('extra')

    cover_level = models.CharField(
        max_length=2,
        choices=CoverLevel.choices,
        default=CoverLevel.NORMAL,
    )

    min_tank_size = models.IntegerField()
    min_school_size = models.IntegerField()

    class Temperament(models.TextChoices):
        AGGRESSIVE = 'AG', _('aggressive')
        NORMAL = 'NO', _('normal')
        TIMID = 'TI', _('timid')

    temperament = models.CharField(
        max_length=2,
        choices=Temperament.choices,
        default=Temperament.NORMAL,
    )

    schooling = models.BooleanField()
    fin_nipper = models.BooleanField()
    vulnerable = models.BooleanField()

    class BreedingDifficulty(models.TextChoices):
        EASY = 'EA', _('easy')
        MEDIUM = 'ME', _('medium')
        HARD = 'HA', _('hard')

    breeding_difficulty = models.CharField(
        max_length=2,
        choices=BreedingDifficulty.choices,
        default=BreedingDifficulty.MEDIUM,
    )

    class BreedingMethod(models.TextChoices):
        LIVE_BEARER = 'LB', _('live bearer')
        BUBBLE_NESTER = 'BN', _('bubble nester')
        UNKNOWN = 'UN', _('unknown')

    breeding_method = models.CharField(
        max_length=2,
        choices=BreedingMethod.choices,
        default=BreedingMethod.LIVE_BEARER
    )

    min_ph = models.FloatField()
    max_ph = models.FloatField()
    min_general_hardness = models.FloatField()
    max_general_hardness = models.FloatField()
    min_alkaline_hardness = models.FloatField()
    max_alkaline_hardness = models.FloatField()
    min_temp = models.FloatField()
    max_temp = models.FloatField()
