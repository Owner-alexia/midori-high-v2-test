# Midori High V17.8

## Ce qui change
- Filtres de classe ajoutés aux listes pertinentes et tri par classe puis ordre alphabétique.
- Registre WL : filtre de classe pour les élèves + bouton `Synchroniser Scolarité`.
- Les WL actives élèves/professeurs/surveillants sont reliées à leur fiche correspondante grâce au SQL V17.8.
- Un profil WL élève nouvellement créé peut donc apparaître automatiquement dans `Élèves` après synchronisation.
- `Accès & comptes` est désormais accessible aux recruteurs WL en consultation.
- Un recruteur WL peut générer un mot de passe temporaire pour un compte non-administrateur ; les mots de passe existants ne sont jamais affichés ni stockés en clair.
- La création/modification des rôles et la suppression des comptes restent réservées à l'administration.

## Installation
1. Remplacer le dossier `site` dans GitHub par celui de ce ZIP.
2. Dans Supabase, exécuter `01_sync_wl_scolarite.sql` fourni dans le ZIP Supabase V17.8.
3. Une seule fois, lancer dans SQL Editor :
   `select public.midori_sync_all_wl_school_links();`
4. Retourner sur le site et ouvrir `Registre WL` puis `Synchroniser Scolarité` pour vérifier la cohérence.
