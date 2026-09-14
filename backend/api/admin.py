from django.contrib import admin
from .models import LeaveRequest

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = (
        "student_name",
        "register_no",
        "department",
        "year",
        "from_date",
        "to_date",
        "status",
    )
    search_fields = ("student_name", "register_no")
    list_filter = ("status", "department", "year")
