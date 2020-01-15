# Generated by Django 2.0.6 on 2020-01-15 03:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import zukode.api.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0013_auto_20191222_1609'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('file_name', models.FileField(upload_to=zukode.api.models.get_upload_path)),
                ('file_type', models.CharField(max_length=30)),
                ('mime_type', models.CharField(max_length=50)),
                ('file_path', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.PositiveSmallIntegerField(default=1)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]