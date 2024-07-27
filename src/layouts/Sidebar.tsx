import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContexts";
import { PageHeaderFirstSection } from "./PageHeader";

export function Sidebar() {

    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

    return(
        <>
            {/* Jika layout page kecil (Responsive) */}
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Short" url="/shorts" />
                <SmallSidebarItem Icon={Clapperboard} title="Subcriptions" url="/subcriptions" />
                <SmallSidebarItem Icon={Library} title="Library" url="/library" />
            </aside>

            {isSmallOpen && (
                <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50" />
            )}

            {/* Jika layout page besar (Responsive) */}
            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 lg:flex ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>

                {/* page header first section */}
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>

                <LargeSidebarSection>
                    <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
                    {/* <LargeSidebarItem IconOrImgUrl={Home} title="Home" url="/" /> */}
                    <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subcriptions" url="/subcriptions" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
                    <LargeSidebarItem IconOrImgUrl={History} title="History" url="/history" />
                    <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
                    <LargeSidebarItem IconOrImgUrl={Clock} title="Watch Later" url="/playlist?list=WL" />

                    {playlists.map(playlist => (
                        <LargeSidebarItem key={playlist.id} IconOrImgUrl={ListVideo} title={playlist.name} url={`/playlist?list=${playlist.id}`} />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Subcriptions">
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem key={subscription.id} IconOrImgUrl={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`} />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
                    <LargeSidebarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/shopping" />
                    <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
                    <LargeSidebarItem IconOrImgUrl={Film} title="Movies & TV" url="/movies-tv" />
                    <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
                    <LargeSidebarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/gaming" />
                    <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
                    <LargeSidebarItem IconOrImgUrl={Trophy} title="Sports" url="/sports" />
                    <LargeSidebarItem IconOrImgUrl={Lightbulb} title="Learning" url="/learning" />
                    <LargeSidebarItem IconOrImgUrl={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
                    <LargeSidebarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
                </LargeSidebarSection>
            </aside>
        </>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}

// Small sidebar
function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>
    );
}

// Large sidebar & large sidebar 
type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = Children.toArray(children).flat();
    const showExpandedButton = childrenArray.length > visibleItemCount;
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

    return (
        <div>{title && <div className="ml-4 mt-2 text-lg mb-1">
            {title}</div>}{visibleChildren}{showExpandedButton &&  
            <Button variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3" onClick={() => setIsExpanded(e => !e)}>
                <ButtonIcon className="w-6 h-6" />
                <div>{isExpanded ? "Show Less" : "Show More"}</div>
            </Button>}
        </div>
    );
}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({ IconOrImgUrl, title, url, isActive = false }: LargeSidebarItemProps) {
    return(
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
            {typeof IconOrImgUrl === "string" ? (
                <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
            ) : (

                <IconOrImgUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    );
}


