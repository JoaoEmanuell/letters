from .cache_manager import CacheManager
from .interfaces import CacheInterface

from api.views.views_cache import UsernameCache

cache_manager_singleton = CacheManager(50, {"username": UsernameCache()})
