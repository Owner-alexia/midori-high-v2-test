# Midori High V2 — état de l’intégration

## Ce qui a été modifié
- `config.js` pointe désormais vers le nouveau projet Supabase V2 fourni dans la conversation.
- L’ancienne copie de configuration a été retirée pour éviter une réutilisation accidentelle de l’URL de l’ancien projet.

## Important : cette archive n’est PAS prête à publier
Le code historique de `app.js` utilise encore des tables et fonctions de l’ancien schéma, dont `students`, `classes`, `grades`, `absences`, `wl_registry`, `messages`, et plusieurs RPC. Le schéma V2 actuellement créé ne contient pas toutes ces tables/colonnes/fonctions. Changer l’URL seule ne rend donc pas le site compatible.

Ne remplace pas encore le dépôt GitHub avec cette archive. La suite doit être une migration contrôlée de l’application et de son schéma, suivie de tests RLS.

## Sécurité
- Ne jamais mettre de clé `service_role` ou `secret` dans ce dépôt.
- La clé `sb_publishable_...` peut être présente côté navigateur, mais toutes les tables exposées doivent avoir des politiques RLS correctes.
- Le rôle `gerant` existe dans la base, mais l’application doit être testée en connexion réelle et chaque table doit avoir des politiques adaptées avant publication.
- Ne pas utiliser `ADMIN_EMAIL` côté navigateur comme mécanisme d’autorisation. Les droits doivent être vérifiés côté serveur/RLS.

## Étapes avant mise en ligne
1. Auditer les colonnes et fonctions réellement utilisées dans `app.js`.
2. Choisir et documenter le schéma cible unique (sans créer des tables concurrentes à l’aveugle).
3. Adapter les appels `from(...)` et `rpc(...)` de l’application au schéma cible.
4. Ajouter les politiques RLS minimales par rôle.
5. Tester avec le compte gérant et un compte ordinaire, y compris les tentatives d’accès interdites.
6. Vérifier les pages essentielles localement avant tout déploiement.
