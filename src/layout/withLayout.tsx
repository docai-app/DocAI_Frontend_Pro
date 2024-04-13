/* eslint-disable react/display-name */


export default function withLayout(Component: any, Layout: any) {

    return () => (
        <Layout>
            <Component />
        </Layout>
    );
}
