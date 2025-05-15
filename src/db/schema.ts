import * as t from "drizzle-orm/sqlite-core";

/**
 * UUID генерируется сервером а не базой данных
 */
const id = t.text('id').primaryKey().notNull();

/**
 * UUID внешнего ключа
 * @param {string} col имя столбца, которая пойдет в БД
 */
const pk = (col: string) => t.text(col).notNull();

/**
 * Временные метки
 */
const timestamps = {
    createdAt: 
        t.text('created_at').$type<Date>().notNull()
        .notNull(),
    updatedAt: 
        t.text('updated_at').$type<Date>().notNull()
        .notNull(),
}

/**
 * USERS
 */
export const usersTable = t.sqliteTable(
    'users',
    {
        id,
        username: t.text('username', { length: 50 }).notNull().unique(),
        password: t.text('password').notNull(),
        ...timestamps,

    }
);

/**
 * THEMES
 */
export const themesTable = t.sqliteTable(
    'themes', 
    {
        id,
        title: t.text('title', { length: 120 }).notNull().unique(),
        color: t.text('color', { length: 50 }),
        userId: pk('user_id').references(() => usersTable.id),
        ...timestamps,
    }
)

/**
 * SENTENCES
 */
export const sentencesTable = t.sqliteTable(
    'sentences',
    {
        id,
        themeId: pk('theme_id').references(() => themesTable.id),
        previewText: t.text('preview_text').notNull(),
        transateText: t.text('transate_text').notNull(),
        type: t.text('type', { length: 50 }).notNull(),
        producer: t.text('producer'),
        ...timestamps,
    }
)

/**
 * SPRINTS
 */
export const sprintsTable = t.sqliteTable(
    'sprints',
    {
        id,
        themeId: pk('theme_id').references(() => themesTable.id),
        ...timestamps,
    }
)

/**
 * EVALUTIONS
 */
export const evalutionsTable = t.sqliteTable(
    'evalutions',
    {
        id,
        sprintId: pk('sprint_id').references(() => sprintsTable.id),
        themeId: pk('theme_id').references(() => themesTable.id),
        sentenceId: pk('sentence_id').references(() => sentencesTable.id),
        success: t.integer('success', { mode: 'boolean' }).default(false),
        ...timestamps,
    }
)

/**
 * SENTENCE_PRIORITY
 */
export const sentencePriorityTable = t.sqliteTable(
    'sentence_priority',
    {
        id,
        themeId: pk('theme_id').references(() => themesTable.id),
        sentenceId: pk('sentence_id').references(() => sentencesTable.id),
        invalidCount: t.integer('invalid_count').notNull(),
        invalidAnswerCount: t.integer('invalid_answer_count').notNull(),
        successAnswerCount: t.integer('success_answer_count').notNull(),
        displayCount: t.integer('display_count').notNull(),
        ...timestamps,
    }
)

/**
 * THEME_PRIORITY_PRIORITY
 */
export const themePriorityTable = t.sqliteTable(
    'theme_priority',
    {
        id,
        themeId: pk('theme_id').references(() => themesTable.id),
        displayCount: t.integer('display_count').notNull(),
        ...timestamps,
    }
)



