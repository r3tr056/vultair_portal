// import { useCallback } from "react";


// type AddNodeFloatingMenuProps = Readonly<{
//     onNodeAdd: (type: BuilderNodeType) => void;
// }>;

// export default function AddNodeFloatingMenu({onNodeAdd}: AddNodeFloatingMenuProps) {
//     const [showMenu, setShowMenu, anchorPosition, _incommingNodeMetadetails] = useAddNodeOnEdgeDropState(s => [s.showMenu, s.actions.setShowMenu, s.anchorPosition, s.incomingNodeMetadetails]);

//     const onOutsideClick = useCallback(
//         () => {
//             setShowMenu(false);
//         },
//         [setShowMenu],
//     );

//     const handleOnNodeAdd = useCallback((type: BuilderNodeType) => {
//         setShowMenu(false);
//         onNodeAdd(type);
//     }, [onNodeAdd, setShowMenu]);

//     const _incommingNodeMetadetails = useMen
// }