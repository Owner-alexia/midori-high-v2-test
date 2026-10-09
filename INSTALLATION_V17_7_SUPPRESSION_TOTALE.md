# Midori High V17.7 — Suppression définitive

## 1. GitHub

Remplacer le contenu du dossier `site/` de votre dépôt par le dossier `site/` de cette version.

Ensuite attendre le déploiement GitHub Pages puis faire `Ctrl + F5`.

## 2. Supabase

Déployer l'Edge Function :

`SUPABASE/functions/admin-hard-delete/index.ts`

Nom exact de la fonction : `admin-hard-delete`

Voir `SUPABASE/README.md` pour les étapes.

## 3. Nouveau comportement

Les boutons de suppression ne révoquent plus l'accès à la place d'une suppression définitive.

Pour les profils/comptes :
- le profil disparaît de Gestion des profils ;
- l'entrée WL disparaît du registre ;
- les données directement liées sont supprimées ;
- le compte Supabase Authentication est supprimé lorsqu'il n'est pas partagé par d'autres profils de la même personne ;
- les historiques RP et journaux du portail liés au profil sont supprimés.

Les boutons « Révoquer l’accès / Réactiver » ont été retirés de la gestion des comptes.

## 4. Confirmation

Les suppressions importantes demandent une confirmation supplémentaire avec le mot :

`SUPPRIMER`

## 5. Important

La fonction ne peut pas effacer d'éventuelles sauvegardes ou journaux techniques internes de Supabase. La suppression vise les données applicatives du portail et le compte Authentication actif.
