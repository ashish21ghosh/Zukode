# Generated by Django 2.0.6 on 2020-01-15 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='size',
            field=models.BigIntegerField(default=0),
        ),
    ]