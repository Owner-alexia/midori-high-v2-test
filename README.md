# Midori High V2 — portail administratif

Ce dossier est une reconstruction cliente raccordée au nouveau projet Supabase V2. Il conserve l'ancien projet séparé. Les données scolaires ne sont pas importées.

## Avant publication
1. Dans le nouveau projet Supabase, ouvrez **SQL Editor**.
2. Si vous avez déjà exécuté les scripts de base V2 et associé le compte administrateur, exécutez `INSTALLATION_V2_SQL.sql` en entier. Ce script ajoute les tables des modules complémentaires ; il ne supprime pas les tables existantes.
3. Vérifiez que `config.js` contient l'URL et la clé **publishable** du nouveau projet. Ne mettez jamais une clé `service_role` ou `secret` dans ce dépôt.
4. Testez d'abord dans un dépôt GitHub de prévisualisation ou une branche séparée. Ne remplacez le site public qu'après connexion réussie.
5. Connectez-vous avec l'adresse réelle utilisée dans Supabase Auth et le mot de passe défini dans Supabase. `admin@midori-high.fr` est une adresse RP d'affichage, pas forcément l'identifiant de connexion.

## Fonctionnalités de cette reconstruction
- Connexion Supabase Auth et vérification du profil associé.
- Pages de gestion génériques pour les profils, classes, matières, cours, clubs, notes, présences, devoirs et affectations du personnel.
- Tables complémentaires pour le registre WL, messages, rendus, points RP, sanctions, événements, journal, rendez-vous et rapports.
- Les modules confidentiels non encore implémentés restent désactivés plutôt que de simuler un fonctionnement.

## Limites et sécurité
- Le code a été vérifié statiquement, mais la connexion au projet distant n'a pas pu être exécutée depuis cet environnement. Il faut tester avec le compte administrateur avant mise en production.
- Les tables V2 et les tables ajoutées par `INSTALLATION_V2_SQL.sql` sont actuellement prévues pour l'accès du gérant. Les politiques dédiées aux élèves et aux autres membres du personnel doivent être définies avant de leur ouvrir ces modules.
- Les formulaires sont des écrans de gestion génériques, pas une reproduction complète de chaque flux de l'ancien site. Les modules médicaux confidentiels restent indisponibles.
- Le script SQL complémentaire est réexécutable et n'efface pas les données. Il doit être exécuté uniquement dans le nouveau projet V2.
