import axios from 'axios'; 
import Image from 'next/image';


interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  login: {
    uuid: string;
  };
}


export default async function TeamsPage() {
  
  const response = await axios.get('https://randomuser.me/api/?results=6');
  const users: User[] = response.data.results;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">Our Team</h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Meet the talented individuals who power our company. Our team is a diverse group of experts dedicated to delivering excellence.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.login.uuid} className="bg-gray-800 p-6 rounded-lg text-center">
            <Image
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700"
              width={128}
              height={128}
            />
            <h2 className="text-xl font-bold text-white">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-blue-400">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}