# Generated by Django 4.2.1 on 2023-06-09 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_note_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='title',
            field=models.CharField(max_length=100, null=True),
        ),
    ]