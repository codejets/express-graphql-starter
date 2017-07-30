export default `

  type TodoItem {
    id: Int!
    text: String!
    creator: User!
  }

  type TodoList {
    id: Int!
    name: String!
    todoitems: [TodoItem!]!
    owner: Int!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    TodoLists: [TodoList!]!
    todoitems: [TodoItem!]!
  }

  type Query {
    allUsers: [User!]! 
    me: User
    userTodoLists(owner: Int!): [TodoList!]!
    userTodoItems(creatorId: Int!): [TodoItem!]!
  }

  type Mutation {
    login(email: String!, password: String!): String!
    register(username: String!, email: String!, password: String!): User!
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(username: String!): Int!
    createTodoList(owner: Int!, name: String!): TodoList!
    createTodoItem(creatorId: Int!, text: String!, todolistId: Int!): TodoItem!
  }
`;
