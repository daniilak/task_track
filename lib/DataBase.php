<?php
class DataBase
{
    private static $db = null;
    private static $dbStream;

    public function __construct()
    {
        try {
            self::$dbStream = new PDO(
                "mysql:host={$GLOBALS['database_host']};dbname={$GLOBALS['database_name']};charset=UTF8",
                $GLOBALS['database_user'],
                $GLOBALS['database_password']
            );
            self::$dbStream->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$dbStream->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $error) {
            trigger_error("Ошибка при подключении к базе данных: {$error}");
        }
    }

    public static function getDB()
    {
        if (self::$db == null) {
            self::$db = new DataBase();
        }
        return self::$db;
    }

    public static function query()
    {
        static::getDB();
        return static::$dbStream;
    }

    static function SQL($sql, $array = FALSE, $up = TRUE)
    {
        $stmt = DataBase::query()->prepare($sql);

        if (!empty($array) && is_array($array)) {
            foreach ($array as $key => $a) {
                $stmt->bindValue(
                    $key + 1,
                    $a,
                    is_integer($a) ? PDO::PARAM_INT : PDO::PARAM_STR
                );
            }
        }

        $stmt->execute();
        if ($up)
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }
}