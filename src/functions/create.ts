import { document } from '../utils/dynamo';
interface ICreateUser {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}

interface IGetUser {
  id: string;
}
export const handleCreate = async (event) => {
  const { id, title, user_id, done, deadline } = JSON.parse(event.body) as ICreateUser;
  await document.put({
    TableName: 'users',
    Item: {
      id,
      user_id,
      title,
      done,
      deadline: new Date(deadline)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "User created"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}

export const getUser = async (event) => {
  const { id } = JSON.parse(event.body) as IGetUser;
  const user = await document.get({id}).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      user
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}