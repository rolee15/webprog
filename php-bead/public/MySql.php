<?php

class MySql
{
   private PDO $pdo;

   function __construct($host, $port, $schema, $user, $passwd)
   {
      $dsn = 'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $schema;
      try {
         $this->pdo = new PDO($dsn, $user,  $passwd);
         $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
         echo 'Database connection failed.';
         die();
      }
   }

   function login($username, $password)
   {
      $query = 'SELECT * FROM users WHERE (username = :username)';
      $values = [':username' => $username];

      try {
         $res = $this->pdo->prepare($query);
         $res->execute($values);
      } catch (PDOException $e) {
         echo 'Query error.';
         die();
      }

      $row = $res->fetch(PDO::FETCH_ASSOC);
      if (is_array($row)) {
         if (password_verify($password, $row['password'])) {
            return true;
         }
      }

      return false;
   }

   function getPublicPlaylists()
   {
      $query = 'SELECT p.id, p.name, u.username, p.tracks
          FROM playlists AS p LEFT JOIN users AS u ON (p.createdBy = u.id)
          WHERE (p.isPublic = :isPublic)';
      $values = [':isPublic' => 1];

      try {
         $res = $this->pdo->prepare($query);
         $res->execute($values);
      } catch (PDOException $e) {
         echo 'Query error.';
         die();
      }

      return $res->fetchAll(PDO::FETCH_ASSOC);
   }

   function getUserPlaylists($username)
   {
      $query = 'SELECT p.id, p.name, p.isPublic, p.tracks
          FROM playlists AS p LEFT JOIN users AS u ON (p.createdBy = u.id)
          WHERE (u.username = :username)';
      $values = [':username' => $username];

      try {
         $res = $this->pdo->prepare($query);
         $res->execute($values);
      } catch (PDOException $e) {
         echo 'Query error.';
         die();
      }

      return $res->fetchAll(PDO::FETCH_ASSOC);
   }

   function getPlaylistById($id)
   {
      $query = 'SELECT p.id, p.name, u.username, p.tracks, p.isPublic
          FROM playlists AS p LEFT JOIN users AS u ON (p.createdBy = u.id)
          WHERE (p.id = :id)';
      $values = [':id' => $id];

      try {
         $res = $this->pdo->prepare($query);
         $res->execute($values);
      } catch (PDOException $e) {
         echo 'Query error.';
         die();
      }

      return $res->fetch(PDO::FETCH_ASSOC);
   }

   function getPlaylistTracks($playlist)
   {
      $trackIdsCsv = $this->tracksToCsv($playlist['tracks']);
      $query = 'SELECT * FROM tracks WHERE id IN (' . $trackIdsCsv . ')';

      try {
         $res = $this->pdo->prepare($query);
         $res->execute();
      } catch (PDOException $e) {
         echo $e;
         die();
      }

      return $res->fetchAll(PDO::FETCH_ASSOC);
   }

   function getPlaylistDuration($playlist)
   {
      $trackIdsCsv = $this->tracksToCsv($playlist['tracks']);
      $query = 'SELECT SEC_TO_TIME(sum(length)) AS total FROM tracks WHERE id IN (' . $trackIdsCsv . ')';

      try {
         $res = $this->pdo->prepare($query);
         $res->execute();
      } catch (PDOException $e) {
         echo $e;
         die();
      }

      return $res->fetch(PDO::FETCH_ASSOC);
   }

   function searchTracks($search)
   {
      $search = "'%" . $search . "%'";
      $query = 'SELECT * FROM tracks WHERE title LIKE ' . $search;

      try {
         $res = $this->pdo->prepare($query);
         $res->execute();
      } catch (PDOException $e) {
         echo $e;
         die();
      }

      return $res->fetchAll(PDO::FETCH_ASSOC);
   }

   private function tracksToCsv($tracks)
   {
      $trackIds = json_decode($tracks);
      return implode(', ', $trackIds);
   }
}
