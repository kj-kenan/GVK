# Generated migration

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitesettings',
            name='mobile',
            field=models.CharField(blank=True, max_length=20, verbose_name='Cep Telefonu'),
        ),
    ]
