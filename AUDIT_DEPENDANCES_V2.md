# Audit statique des dépendances Supabase

Généré à partir des appels trouvés dans `app.js`. Ceci est un inventaire statique, pas un test d’exécution.

## Tables appelées
- `absences`
- `activity_logs`
- `appointments`
- `attendance`
- `classes`
- `grades`
- `homework`
- `homework_submissions`
- `message_attachments`
- `messages`
- `midori_people`
- `midori_profile_links`
- `professors`
- `profiles`
- `sanctions`
- `student_points`
- `students`
- `supervisor_reports`
- `wl_registry`

## RPC appelées
- `admin_create_profile_linked`
- `ensure_current_profile`
- `list_message_recipients`
- `mark_message_read`
- `midori_add_validated_wl`
- `midori_finalize_wl_profile`
- `midori_get_my_functions`
- `midori_migrate_link_profile`
- `midori_migrate_update_profile`
- `midori_migration_search_profiles`
- `midori_search_people`
- `midori_set_rp_status`
- `midori_sync_all_wl_school_links`
- `midori_sync_wl_school_record`
- `save_attendance`

## Conclusion
Ces dépendances doivent être comparées au schéma V2 et adaptées avant publication. La simple modification de `config.js` ne suffit pas.
