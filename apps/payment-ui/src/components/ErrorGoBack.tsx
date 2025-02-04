import { ImWarning } from 'react-icons/im';
import { VscArrowLeft } from 'react-icons/vsc';

export const ErrorGoBack = (props: { top: string; bottom: string; redirect: string | null }) => {
    return (
        <div className="flex flex-col">
            <ErrorDisplay top={props.top} bottom={props.bottom} />
            <GoBackButton redirect={props.redirect} />
        </div>
    );
};

const ErrorDisplay = (props: { top: string; bottom: string }) => {
    return (
        <div className="rounded-lg outline-none border-2 border-orange-600 mt-16 h-16 bg-orange-100 flex flex-row items-start">
            <div className="flex flex-col h-full justify-center">
                <ImWarning className="text-orange-600 ml-4 mr-3 text-md" />
                <div className="text-md text-orange-100 font-light">{'.'}</div>
            </div>
            <div className="flex flex-col h-full justify-center">
                <div className="text-sm text-orange-800 font-semibold">{props.top}</div>
                <div className="text-sm text-orange-800 font-light">{props.bottom}</div>
            </div>
        </div>
    );
};

const GoBackButton = (props: { redirect: string | null }) => {
    return (
        <button
            className="btn btn-ghost outline-none border-2 border-black hover:bg-white hover:border-black text-black normal-case  mt-4"
            onClick={() => {
                if (props.redirect != null) {
                    window.location.href = props.redirect;
                }
            }}
        >
            <VscArrowLeft className="w-6 h-6 pr-1" />
            <div className="pl-1 text-md">Go back</div>
        </button>
    );
};
