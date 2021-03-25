import load from '../views/loading.gif';

export default function Loading() {
    return (
        <div style={{height: '100vh', width: '100vw', backgroundColor: '#F7F6FB', zIndex: '20000', backgroundSize: 'cover'}}>
            <img src={load} style={{top: '0', bottom: '0', right: '0', left: '0', position: 'absolute', margin: 'auto'}} />
        </div>
    );
}