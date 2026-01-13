from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import Testimonial
from .serializers import TestimonialSerializer, TestimonialSubmitSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for testimonials
    - GET: Returns approved testimonials
    - POST to /submit/: Submit new testimonial (rate-limited)
    """
    permission_classes = [AllowAny]
    queryset = Testimonial.objects.filter(is_approved=True)
    serializer_class = TestimonialSerializer
    pagination_class = None  # No pagination for testimonials
    
    @method_decorator(ratelimit(key='ip', rate='3/h', method='POST'))
    @action(detail=False, methods=['post'], serializer_class=TestimonialSubmitSerializer)
    def submit(self, request):
        """Submit a new testimonial (rate-limited: 3 per hour per IP)"""
        serializer = TestimonialSubmitSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'message': 'Fotoğrafınız başarıyla gönderildi! Onaylandıktan sonra sitemizde görünecektir.',
                    'message_en': 'Your photo has been submitted successfully! It will appear on our site after approval.'
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




