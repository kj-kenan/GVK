from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from apps.services.models import Service
from apps.team.models import TeamMember
from apps.blog.models import BlogPost
from apps.contact.models import ContactMessage
from apps.testimonials.models import Testimonial
from apps.reviews.models import GoogleReview


class DashboardStatsView(APIView):
    """
    Admin dashboard statistics endpoint
    Provides overview of all content and messages
    """
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        stats = {
            'content': {
                'services': Service.objects.count(),
                'active_services': Service.objects.filter(is_active=True).count(),
                'team_members': TeamMember.objects.count(),
                'active_team_members': TeamMember.objects.filter(is_active=True).count(),
                'blog_posts': BlogPost.objects.count(),
                'published_blog_posts': BlogPost.objects.filter(is_published=True).count(),
            },
            'interactions': {
                'total_messages': ContactMessage.objects.count(),
                'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
                'testimonials': Testimonial.objects.count(),
                'approved_testimonials': Testimonial.objects.filter(is_approved=True).count(),
                'pending_testimonials': Testimonial.objects.filter(is_approved=False).count(),
            },
            'reviews': {
                'google_reviews': GoogleReview.objects.count(),
                'active_reviews': GoogleReview.objects.filter(is_active=True).count(),
            }
        }
        
        return Response(stats)
