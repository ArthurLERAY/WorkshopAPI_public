Routes pour les maisons :

**POST** : "/user/houses"(__user_id en body__) -> renvoie toutes les maison d'un utilisateur  
**GET** : "/houses" -> renvoie toutes les maisons qui existent  
**POST** : "/house/create"(__name et user_id en body__) -> créé une nouvelles maison pour un utilisateur  
**POST** : "/house/delete"(__house_id dans le body__) -> supprime une maison  
  
Routes pour les pièces :  
  
**GET** : "/room/:id"(__où id est l'id de la pièce recherchée__) -> renvoie la pièce et tout ses équipements  
**POST** "/house/rooms"(__house_id en body__) -> renvoie les pièces d'une maison  
**GET** "/rooms" -> renvoie toutes les pièces de la bdd  
**POST** : "/room/create"(__house_id et name en body__) -> créé une pièce liée à la maison  
**POST** : "/room/delete"(__room_id dans le body__) -> supprime une pièce liée à la maison  
**POST** : "/room/add/equipment"(__room_id et equipment_id dans le body__) -> ajoute un équipement à une pièce  
**POST** : "/room/remove/equipment"(__room_id et equipment_id dans le body__) -> retire un équipement à une pièce  
  
Routes pour les équipements :  
  
**GET** : "/equipments/all" -> renvoie tout les équipements  
**GET** : "/equipment/:id"(__où id est l'id de l'équipement__) -> renvoie l'équipement désigné par l'id  
**POST** : "/equipments/create"(__name, watts et room_id en body__) -> créé un équipement  
**POST** : "/equipments/delete"(__id dans le body__) -> supprime un équipement par son id  
**POST** : "/equipments/sorted" -> renvoie les équipements triés par catégorie  
**POST** : "/equipments/update"(__equipment_id, name, watts-pas obligatoire, quantity-pas obligatoire__) -> update un équipement  
**GET** : "/equipments/last" -> renvoie le dernier équipement  
  
Routes pour les utilisateurs :  
  
**POST** : "/user/register"(__email et password dans le body__) -> créé un user  
**POST** : "/user/login"(__email et password dans le body__) -> login l'utilisateur  
**POST** : "/user/logout"(__id du user dans le body__) -> logout l'utilisateur  
**GET** : "/user/all" -> retourne tout les utilisateurs  
**POST** : "/user/fromToken"(__token dans le body__) -> retourne un user de par son token  
  
Routes pour les suggestions :  
  
**GET** : "/suggestions" -> retourne toutes les suggestion  
**GET** : "/suggestions/sorted" -> retourne toutes les suggestions par catégorie  
**POST** : "/suggestions/fromEquipment"(__equipment json en body avec id, watts et typeId__) -> retourne toutes les suggestions pour un équipement  