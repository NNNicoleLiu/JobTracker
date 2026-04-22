from django.db import migrations

def create_google_socialapp(apps, schema_editor):
    import os

    SocialApp = apps.get_model("socialaccount", "SocialApp")
    Site = apps.get_model("sites", "Site")

    client_id = os.environ.get("GOOGLE_CLIENT_ID")
    secret = os.environ.get("GOOGLE_CLIENT_SECRET")

    site = Site.objects.get(id=1)

    app, created = SocialApp.objects.get_or_create(
        provider="google",
        name="Google",
        defaults={
            "client_id": client_id,
            "secret": secret,
        },
    )

    if created:
        app.sites.add(site)


class Migration(migrations.Migration):

    dependencies = [
        ("your_app", "0002_alter_user_id"),  # 👈 depend on latest migration
        ("sites", "0002_alter_domain_unique"),
        ("socialaccount", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_google_socialapp),
    ]