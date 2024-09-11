'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.createTable('users', {
    id: {
      type: 'int4',
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    avatar_url: {
      type: 'string',
    },
    created_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
  });

  await db.createTable('rooms', {
    id: {
      type: 'int4',
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: 'string',
      notNull: true,
    },
    description: {
      type: 'string',
    },
    owner_id: {
      type: 'int4',
      notNull: true,
    },
    room_url: {
      type: 'string',
      defaultValue: 'https://via.placeholder.com/75',
    },
    created_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
  });

  await db.createTable('user_rooms', {
    id: {
      type: 'int4',
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: 'int4',
      notNull: true,
    },
    room_id: {
      type: 'int4',
      notNull: true,
    },
    joined_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
  });

  await db.createTable('operations', {
    id: {
      type: 'int4',
      primaryKey: true,
      autoIncrement: true,
    },
    deposit: {
      type: 'int',
      notNull: true,
    },
    description: {
      type: 'string',
    },
    owner_id: {
      type: 'int4',
      notNull: true,
    },
    room_id: {
      type: 'int4',
    },
    for_users_ids: {
      type: 'int4[]',
    },
  });

  await db.addForeignKey(
    'rooms',
    'users',
    'fk_user_id',
    {
      owner_id: 'id',
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  );

  await db.addForeignKey(
    'user_rooms',
    'users',
    'fk_user_id',
    {
      user_id: 'id',
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  );

  await db.addForeignKey(
    'user_rooms',
    'rooms',
    'fk_room_id',
    {
      room_id: 'id',
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  );

  await db.addForeignKey(
    'operations',
    'users',
    'fk_user_id',
    {
      owner_id: 'id',
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  );

  await db.addForeignKey(
    'operations',
    'rooms',
    'fk_room_id',
    {
      room_id: 'id',
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  );
};

exports.down = function (db) {
  return db
    .dropTable('operations')
    .then(() =>
      db
        .dropTable('user_rooms')
        .then(() => db.dropTable('rooms').then(() => db.dropTable('users')))
    );
};

exports._meta = {
  version: 1,
};