# Guide rapide — accès aux espaces

Le compte de connexion est géré dans **Supabase → Authentication → Users**. Le rôle et le rattachement à une fiche (élève/professeur/surveillant) sont gérés depuis **Administration → Accès & comptes**.

## Créer / lier un accès
1. Créez d’abord le compte dans Supabase Authentication.
2. Dans **Accès & comptes**, choisissez le rôle et la fiche à relier.
3. Renseignez l’identifiant et le nom puis enregistrez.

## Modifier un accès existant
Cliquez sur **Modifier** dans la ligne du compte. Vous pouvez changer l’identifiant, le nom, le rôle, l’état et la fiche liée. L’e-mail affiché est l’e-mail du compte Auth et n’est pas modifié depuis cette page.

## Retirer l’accès
Cliquez sur **Révoquer l’accès**. Le compte Auth reste conservé, mais `profiles.active` passe à `false` et l’accès au portail est bloqué. **Réactiver** remet `active` à `true`.

## Messagerie
Les messages restent internes au portail : aucune vraie boîte e-mail externe n’est utilisée. L’expéditeur et le destinataire peuvent supprimer le message qu’ils ont envoyé ou reçu.
