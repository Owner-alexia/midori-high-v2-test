# Midori High V17 — WL / profils RP

Cette version ajoute :

- Statut RP évolutif par personnage : 🟢 Normal / 🔴 Délinquant / ⭐ Parfait.
- Historique des changements de statut avec motif et auteur.
- Statut visible dans les principaux documents administratifs élèves (élèves, appel, absences, notes, devoirs, discipline, clubs, points, rendez-vous, dossiers santé et dossier élève).
- Le statut est lié au **profil/personnage**, pas à la personne globale : deux ALT peuvent donc avoir des statuts différents.
- Le recruteur WL peut définir le statut lors de l'enregistrement d'une nouvelle WL.
- Admin + Recruteur WL peuvent corriger/modifier les anciens profils et leur statut.
- Migration améliorée : recherche par nom RP, Discord ou Roblox, et affichage des profils déjà rattachés à chaque personne.
- Séparation claire des identifiants : l'e-mail est l'identifiant du portail ; Discord et Roblox sont des données RP et ne servent pas à se connecter.
- Aucun lien technique avec Discord.

## Installation

1. Dans Supabase SQL Editor, exécuter **`sql_v17_rp_status.sql`** après les SQL V14/V16 déjà installés.
2. Remplacer le dossier `site/` sur GitHub par celui de cette archive.
3. Faire `Ctrl + F5` puis reconnecter le compte.

## Important

Ne supprimez pas les anciennes WL. La migration V17 est manuelle et ne supprime aucun profil.

Pour corriger les anciennes données :

**📋 WL → 🔄 Migration des profils**

Pour modifier un statut depuis le registre WL, utiliser **✏️ Modifier** sur la ligne concernée.
