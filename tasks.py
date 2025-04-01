from invoke import Collection
from core.cli import createsuperuser

ns = Collection()
ns.add_task(createsuperuser)
