from django.db import migrations

def create_social_app(apps, schema_editor):
    import os

    SocialApp = apps.get_model("socialaccount", "SocialApp")
    Site = apps.get_model("sites", "Site")

    client_id = os.environ.get("GOOGLE_CLIENT_ID")
    secret = os.environ.get("GOOGLE_CLIENT_SECRET")

    # get_or_create guarantees a Site row exists on any fresh DB (CI, new dev env, etc.)
    site, _ = Site.objects.get_or_create(
        pk=1,
        defaults={
            'domain': 'localhost',
            'name':   'localhost',
        },
    )

    app, created = SocialApp.objects.get_or_create(
        provider="google",
        name="Google",
        defaults={
            'client_id': os.environ.get('GOOGLE_CLIENT_ID') or 'placeholder',  # ← never None
            'secret':    os.environ.get('GOOGLE_CLIENT_SECRET') or 'placeholder',
        },
    )

    if created:
        app.sites.add(site)

def reverse_social_app(apps, schema_editor):
    SocialApp = apps.get_model('socialaccount', 'SocialApp')
    SocialApp.objects.filter(provider='google').delete()

class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_alter_user_id"),  # 👈 depend on latest migration
        ("sites", "0002_alter_domain_unique"),
        ("socialaccount", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_social_app, reverse_social_app),
    ]