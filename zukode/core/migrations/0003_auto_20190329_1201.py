# Generated by Django 2.0.6 on 2019-03-29 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20190327_1550'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_text',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='User_Text',
        ),
    ]
