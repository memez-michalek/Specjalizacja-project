# Generated by Django 3.2.16 on 2023-02-04 17:22

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=128, verbose_name='community name')),
                ('bio', models.CharField(blank=True, max_length=1024, null=True, verbose_name='community bio')),
                ('created', models.DateTimeField(blank=True, editable=False, null=True)),
                ('background_image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='community_image', to='images.image')),
            ],
        ),
    ]
