# Generated by Django 2.0.6 on 2019-03-29 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coretext',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
