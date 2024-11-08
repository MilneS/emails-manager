import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import EditableItem from "./EditableItem";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../../../../../appStore/cardsSlice";
import { Card } from "../../../../../appStore/interface/interface.model";
import { RootSate } from "../../../../../appStore/store";
import type {
  Active,
  Over,
} from "../../../../../node_modules/@dnd-kit/core/dist/store/index.d.ts";
import EmailTitleCard from "./EmailTitleCard";

export default function SortableCont() {
  const [items, setItems] = useState<string[]>([]);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const selectedTemplate = useSelector(
    (state: RootSate) => state.cardsReducer.selectedTemplate
  );
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const ids: string[] = [];
    selectedTemplate?.cards.forEach((itm) => {
      ids.push(itm.id);
    });
    setItems(ids);
  }, [selectedTemplate]);

  useEffect(() => {
    const itemsData: Card[] = [];
    for (let i = 0; i < items.length; i++) {
      const found = selectedTemplate?.cards.find((itm) => items[i] === itm.id);
      if (found) {
        itemsData.push(found);
      }
    }
    dispatch(setCards(itemsData));
  }, [items, selectedTemplate]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToFirstScrollableAncestor]}
    >
      <EmailTitleCard />
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <Box overflow="scroll" height="calc( 100% - 4rem )">
          {items.map((id) => {
            const item = selectedTemplate?.cards.find((itm) => itm.id === id);
            return (
              <Box key={id} py="0.1rem">
                {item && (
                  <EditableItem
                    key={id}
                    itemId={id}
                    item={item}
                    isGrabbed={id === draggedItemId}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active }: { active: Active }) {
    setDraggedItemId(`${active.id}`);
  }
  function handleDragEnd({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) {
    if (active?.id && over?.id && active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(`${active.id}`);
        const newIndex = items.indexOf(`${over.id}`);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setDraggedItemId(null);
  }
}
