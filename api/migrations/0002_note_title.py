# Generated by Django 4.2.1 on 2023-06-09 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='title',
            field=models.TextField(blank=True, null=True),
        ),
    ]