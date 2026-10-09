# Midori High V9 — installation

## Ce qui change

### Discord reste le recrutement WL
Les candidatures, entretiens et refus sont gérés sur Discord.
Le site ne contient PAS de candidatures en attente/refusées.

### Registre WL
Le registre est visible uniquement par `admin` et `recruteur_wl`.
Une personne n'y apparaît qu'après WL validée.

### Profils multiples
Un compte de connexion peut être rattaché à plusieurs profils RP.
Un profil peut être principal ou `ALT PERSO`.
Les profils restent séparés pour les permissions et les données.

### Départ
Retirer un profil WL doit désactiver son accès sans supprimer les autres profils liés à la même personne.

### Identifiant
L'identifiant affiché est l'adresse e-mail scolaire du profil.

### Mot de passe
Supabase Auth ne permet pas de lire le mot de passe actuel. Le portail ne doit donc jamais le stocker en clair.
À la place, utiliser une Edge Function d'administration pour réinitialiser le mot de passe et fournir un mot de passe temporaire si nécessaire.

## Installation

1. Faire une sauvegarde de la base Supabase.
2. Exécuter `sql/V9_WL_PROFILS.sql`.
3. Ajouter le rôle `recruteur_wl` aux profils autorisés.
4. Déployer une Edge Function sécurisée pour la réinitialisation du mot de passe.
5. Tester avec un compte recruteur WL et un compte admin.
6. Vérifier les policies RLS avant ouverture à l'équipe.

## Boutons Accès & comptes

La V8 appelle actuellement des fonctions serveur telles que:
- `admin-update-user-email`
- `admin-relink-profile`
- `admin-delete-user`
- `admin_create_profile_linked`

Le ZIP V9 conserve le front-end mais documente ces dépendances: elles doivent exister dans Supabase pour que les boutons soient réellement opérationnels.
