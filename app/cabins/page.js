import Counter from '../_components/Counter';

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return (
    <div>
      <h1>All the Available Cabins</h1>

      <ol>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ol>

      <Counter users={data} />
    </div>
  );
}

// All the server and client components runs (renders) on the server in the initial render.
