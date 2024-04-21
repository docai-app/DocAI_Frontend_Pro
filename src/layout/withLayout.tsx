export default function withLayout(Component: any, Layout: any) {
    return () => (
        <Layout>
            <Component />
        </Layout>
    );
}
