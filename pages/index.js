import Layout from "../components/Layout";
import Link from "next/Link";
export default function Home({ pokemon }) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">Welcome to Next.js</h1>
      <ul>
        {pokemon.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  className="w-20 h-20 mr-3"
                  src={pokemon.image}
                  alt={pokemon.name}
                ></img>
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.log(err);
  }
}
