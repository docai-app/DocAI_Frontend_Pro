import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { useEffect, useRef } from 'react';

interface ViewProps {
    value: any;
}
const transformer = new Transformer();

export default function MarkmapView(props: ViewProps) {
    const { value } = props;

    const refSvg = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (value) {
            if (!refSvg.current) return;
            refSvg.current.innerHTML = '';
            const mm = Markmap.create(refSvg.current);
            if (!mm) return;
            const { root } = transformer.transform(value);
            // console.log('root', root);
            // console.log('value', value);
            mm.setData(root);
            mm.fit();
        }
    }, [value]);
    return (
        <>
            <div className="w-full overflow-auto items-center flex flex-col justify-center  ">
                {/* <p className=' text-sm text-black font-bold'>以下是生成的知識圖譜</p>
                <p className='w-full h-[0.1px] bg-black my-2'></p> */}
                <svg
                    ref={refSvg}
                    xmlns="http://www.w3.org/2000/svg"
                    className=" w-full bg-white min-h-[800px] text-black"
                ></svg>
            </div>
        </>
    );
}
