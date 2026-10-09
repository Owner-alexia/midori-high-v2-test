# Midori High — portail administratif

Cette version ajoute une messagerie interne RP, la remise des devoirs avec pièces jointes et les corrections des pages **Accès & comptes**, **Notes** et **Calendrier RP**.

## Installation GitHub Pages
1. Décompresser ce dossier.
2. Envoyer tout son contenu à la racine du dépôt GitHub, pas le ZIP lui-même.
3. Conserver `config.js` et `app.js` de cette version ensemble.

## Installation Supabase
Le portail existant doit déjà avoir été initialisé avec votre SQL principal.

Ensuite, exécuter dans **Supabase → SQL Editor** :
1. `SUPABASE_MESSAGERIE_DEVOIRS.sql` pour installer/mettre à jour la messagerie et les remises de devoirs.
2. `SUPABASE_REPARATIONS.sql` pour réparer les permissions de suppression des messages, la gestion des accès, les colonnes des notes et le calendrier RP.

Le fichier `SUPABASE_REPARATIONS.sql` ne supprime pas vos données.

## Corrections incluses
- Messagerie : suppression possible d’un message reçu **ou** envoyé, avec suppression de ses pièces jointes ; bouton disponible dans la liste et dans l’ouverture du message.
- Envoi : le bouton passe à « Envoi… » pendant le traitement pour éviter les doubles envois causés par plusieurs clics.
- Accès & comptes : bouton **Modifier** pour changer rôle, nom, identifiant, état et fiche liée ; **Révoquer l’accès** désactive l’accès au portail sans supprimer l’utilisateur Supabase Authentication ; **Réactiver** permet de le remettre actif.
- Notes : migration de compatibilité pour les anciennes tables `grades` qui n’avaient pas la colonne `value`.
- Calendrier RP : table et policies vérifiées/créées par le SQL de réparation.

## Important
La révocation d’un accès agit sur `profiles.active`. Elle empêche l’utilisateur d’utiliser le portail mais ne supprime pas son compte dans **Supabase Authentication**. Une suppression définitive d’un utilisateur Auth doit rester une opération serveur protégée.


## Suppression définitive des comptes
La page **Accès & comptes** possède **🗑️ Supprimer définitivement** via la Supabase Edge Function `admin-delete-user`. Voir `INSTALLER_SUPPRESSION_COMPTE.txt`.


## V9 — WL & profils multiples
Voir `INSTALLATION_V9.md` et `sql/V9_WL_PROFILS.sql`.
