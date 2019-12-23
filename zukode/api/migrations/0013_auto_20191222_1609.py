# Generated by Django 2.0.6 on 2019-12-22 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20191222_1606'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coretext',
            name='content_type',
            field=models.CharField(choices=[('text', 'Text'), ('image', 'Image'), ('video', 'Video'), ('head', 'Head'), ('math', 'Math'), ('code', 'Code'), ('md', 'Md')], max_length=5),
        ),
    ]
