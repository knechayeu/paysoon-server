'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  // Create users table
  db.createTable('users', {
    id: { type: 'int4', primaryKey: true, autoIncrement: true },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    username: { type: 'string' },
    avatar_url: { type: 'string' }
  }, (err) => {
    if (err) return callback(err);

    // Create rooms table
    db.createTable('rooms', {
      id: { type: 'int4', primaryKey: true, autoIncrement: true },
      title: { type: 'string', notNull: true },
      owner_id: { type: 'int4', notNull: true },
    }, (err) => {
      if (err) return callback(err);

      db.addForeignKey('rooms', 'users', 'fk_user', {
        owner_id: 'id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }, callback);

      // Create user_rooms table
      db.createTable('user_rooms', {
        id: { type: 'int4', primaryKey: true, autoIncrement: true },
        user_id: { type: 'int4', notNull: true },
        room_id: { type: 'int4', notNull: true },
        createdAt: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') }
      }, (err) => {
        if (err) return callback(err);

        // Add foreign key constraints
        db.addForeignKey('user_rooms', 'users', 'fk_user', {
          user_id: 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, (err) => {
          if (err) return callback(err);

          db.addForeignKey('user_rooms', 'rooms', 'fk_room', {
            room_id: 'id'
          }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }, callback);
        });
      });
    });
  });
};

exports.down = function (db, callback) {

  db.dropTable('user_rooms', (err) => {
    if (err) return callback(err);

    db.dropTable('rooms', (err) => {
      if (err) return callback(err);

      db.dropTable('users', callback);
    });
  });
};

exports._meta = {
  "version": 1
};
