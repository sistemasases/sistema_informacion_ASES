from rest_framework.routers import DefaultRouter
from .views import seguimiento_viewsets

router = DefaultRouter()

router.register(r'seguimiento', seguimiento_viewsets, basename="seguimiento")

urlpatterns = router.urls

