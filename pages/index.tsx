import React from 'react';
import Head from "next/head";
import Parser from 'rss-parser';
import Post, { IAuthor, IPost } from "../components/Post";
import Header from "../components/Header";
import Grid from "../metrum/Grid";
import Container from '../metrum/Container';
import Heading from "../metrum/Heading";
import Footer from "../components/Footer";
import Job, { IJob } from "../components/Job";
import Link from "../metrum/Link";
import Event, { IEvent } from "../components/Event";
import Podcast, { IPodcast } from "../components/Podcast";
import EasterEgg from "../components/EasterEgg";
import Tracking from "../components/Tracking";

interface HomePageProps {
    posts: IPost[];
    jobs: IJob[];
    events: IEvent[];
    podcasts: IPodcast[];
}

const HomePage: React.FunctionComponent<HomePageProps> = ({ posts, jobs, events, podcasts }) => {
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = '//allegrotechio.disqus.com/count.js';
        script.async = true;
        script.setAttribute('id', 'dsq-count-scr');
        document.body.appendChild(script);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <link rel="prefetch" href="https://allegrotechio.disqus.com/count.js"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="description"
                      content="Allegro Tech to miejsce, w którym nasi inżynierowie dzielą się wiedzą oraz case study z wybranych projektów w firmie - w formie artykułów, podcastów oraz eventów."/>
                <title>Allegro Tech</title>
                <meta property="og:site_name" content="allegro.tech"/>
                <meta property="og:title" content="allegro.tech"/>
                <meta property="og:url" content="https://allegro.tech"/>
                <meta property="og:type" content="site"/>
                <meta property="og:image" content="images/allegro-tech.png"/>
                <link rel="shortcut icon" href="favicon.ico"/>
                <link rel="canonical" href="https://allegro.tech" itemProp="url"/>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                    ga('create', 'UA-55852483-1', 'auto');
                    ga('send', 'pageview');
                `
                }}>
                </script>
            </Head>
            <Header/>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" className="m-padding-left-24 m-padding-right-24">Blog</Heading>
                <Grid>
                    {posts.map(post => (
                        <Grid.Col key={post.guid} size={12} smSize={6} lgSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Post {...post} />
                        </Grid.Col>
                    ))}
                </Grid>
                <Link
                    className="m-padding-top_8 m-padding-bottom_8 m-margin-bottom_8 m-display-block m-width_100 m-text-align_center m-text-transform_uppercase"
                    href="/blog/">
                    Zobacz więcej wpisów
                </Link>
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" className="m-padding-left-24 m-padding-right-24">Podcasty</Heading>
                <Grid>
                    {podcasts.map(podcast => (
                        <Grid.Col key={podcast.guid} size={12} smSize={6} lgSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Podcast {...podcast}/>
                        </Grid.Col>
                    ))}
                </Grid>
                <Link
                    className="m-padding-top_8 m-padding-bottom_8 m-margin-bottom_8 m-display-block m-width_100 m-text-align_center m-text-transform_uppercase"
                    href="/podcast/">
                    Zobacz więcej podcastów
                </Link>
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" className="m-padding-left-24 m-padding-right-24">Wydarzenia</Heading>
                <Grid>
                    {events.map(event => (
                        <Grid.Col key={event.id} size={12} smSize={6} lgSize={6}
                                  className="m-display-flex m-flex-direction_column">
                            <Event id={event.id} name={event.name} link={event.link} venue={event.venue}
                                   time={new Date(event.time)}/>
                        </Grid.Col>
                    ))}
                </Grid>
                <Link
                    className="m-padding-top_8 m-padding-bottom_8 m-margin-bottom_8 m-display-block m-width_100 m-text-align_center m-text-transform_uppercase"
                    href="https://www.meetup.com/allegrotech/events/">Zobacz więcej wydarzeń</Link>
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" className="m-padding-left-24 m-padding-right-24">Oferty pracy</Heading>
                <Container>
                    {jobs.map(job => (
                        <Job key={job.id} id={job.id} name={job.name} location={job.location}/>
                    ))}
                </Container>
                <Link
                    className="m-padding-top_8 m-padding-bottom_8 m-margin-bottom_8 m-display-block m-width_100 m-text-align_center m-text-transform_uppercase"
                    href="https://allegro.pl/praca">Zobacz więcej ofert</Link>
            </Container>
            <Footer/>
            <EasterEgg/>
            <Tracking/>
        </React.Fragment>
    );
}

export async function getStaticProps() {
    type CustomItem = { authors: IAuthor[] };
    const parser: Parser<any, CustomItem> = new Parser({ customFields: { item: ['authors'] } });
    const postsPromise = parser.parseURL('https://allegro.tech/feed.xml');
    const podcastsPromise = parser.parseURL('https://allegro.tech/podcast/feed.xml')
    const jobsPromise = fetch('https://api.smartrecruiters.com/v1/companies/allegro/postings?custom_field.58c15608e4b01d4b19ddf790=c807eec2-8a53-4b55-b7c5-c03180f2059b')
        .then(response => response.json())
        .then(json => json.content);
    const eventsPromise = fetch('https://api.meetup.com/allegrotech/events?status=past,upcoming&desc=true&photo-host=public&page=20')
        .then(response => response.json());

    const [posts, jobs, events, podcasts] = await Promise.all([postsPromise, jobsPromise, eventsPromise, podcastsPromise]);

    return {
        props: {
            posts: posts.items.slice(0, 4),
            jobs: jobs.slice(0, 5),
            events: events.slice(0, 4),
            podcasts: podcasts.items.slice(0, 4)
        },
    }
}

export default HomePage
