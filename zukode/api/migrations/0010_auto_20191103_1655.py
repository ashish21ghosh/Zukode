# Generated by Django 2.0.6 on 2019-11-03 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_directory_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='directory',
            name='title',
        ),
        migrations.AddField(
            model_name='directory',
            name='content',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
