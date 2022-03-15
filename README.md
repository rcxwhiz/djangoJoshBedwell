# My Personal Website

This repository contains my Django code for my website at [joshbedwell.com](joshbedwell.com). It also contains some of
the personal project that are listed my website that have interactive demos. It is hosted on a
[DigitalOcean droplet](https://www.digitalocean.com/products/droplets/) with a Postgres database, Gunicorn and Nginx
using
[this](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-20-04)
guide and secured with Let's Encrypt using
[this](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04) guide.

### TODO
- Proof read
- Link to linkedin
- Add blog page
- Add pagination
- Add a contact me that doesn't publicly expose my email
- Use django env stuff for sensitive keys and then commit settings.py
- redo css with inheritance to not directly use any bootstrap classes (except for maybe basic ones)
- try to make more blocks in the code or some more inheritable pages
