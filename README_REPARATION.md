# Midori High V2 — paquet de réparation

## Ce paquet contient
- Les pages HTML du portail V2.
- `app.js` ajusté pour résoudre le compte connecté via `midori_people.auth_user_id`, puis `profiles.person_id`.
- `config.js` conservant l’URL et la clé publishable du projet Supabase V2 déjà configuré.
- Les styles et le script SQL d’extension déjà présents dans le projet.

## Mise en place sur GitHub Pages
1. Ouvrir le dépôt `midori-high-v2-test`.
2. Télécharger une copie de sécurité du dépôt actuel avant remplacement.
3. Dans le dépôt, remplacer les fichiers du site par le contenu du dossier `midori-high-main` de cette archive (les fichiers doivent être à la racine du dépôt, pas dans un sous-dossier supplémentaire).
4. Enregistrer les changements avec **Commit changes**.
5. Attendre le déploiement GitHub Pages, puis ouvrir le site et faire `Ctrl + F5`.
6. Se connecter avec le compte administrateur existant.

## Supabase
Le correctif de résolution du profil dans `app.js` ne demande pas de nouvelle requête SQL. Ne relance pas le script SQL uniquement pour ce changement.

## Limites connues
Ce paquet est une base V2 de compatibilité avec les tables `school_*` actuellement présentes. Il ne restaure pas automatiquement les anciennes données ni toutes les fonctions RPC/Edge Functions de l’ancien portail. Certains modules avancés peuvent donc rester à compléter après vérification des pages. Le paquet n’a pas été testé contre le projet Supabase distant.

Ne publie jamais de clé `service_role` dans `config.js`.
