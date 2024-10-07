import { ReactNode, useEffect, useState } from 'react';
import BlogPosts, { BlogPost } from './components/BlogPosts';
import { get } from './util/http';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage';

type RawDataBloPost = {
	id: number;
	userId: number;
	title: string;
	body: string;
};

function App() {
	const [posts, setPosts] = useState<BlogPost[]>();
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState<string>();

	useEffect(() => {
		async function fetchPosts() {
			try {
				setIsFetching(true);
				const data = await get<RawDataBloPost[]>(
					'https://jsonplaceholder.typicode.com/posts'
				);

				const blogPosts: BlogPost[] = data.map((rawPost) => {
					return {
						id: rawPost.id,
						title: rawPost.title,
						text: rawPost.body,
					};
				});
				setPosts(blogPosts);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}

			setIsFetching(false);
		}

		fetchPosts();
	}, []);

	let content: ReactNode;

	if (error) {
		content = <ErrorMessage text={error} />;
	}

	if (posts) {
		content = <BlogPosts posts={posts} />;
	}

	if (isFetching) {
		content = <p id='loading-fallback'>Fetching posts...</p>;
	}
	return (
		<main>
			<img src={fetchingImg} alt='Loader' />
			{content}
		</main>
	);
}

export default App;
