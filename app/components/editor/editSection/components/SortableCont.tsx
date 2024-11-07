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
import {
  setCardsInputs,
  setCardsOrder,
} from "../../../../../appStore/cardsSlice";
import { Card, Inpt } from "../../../../../appStore/interface/interface.model";
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
    const cardInp: Inpt[] = [];
    selectedTemplate?.cardsOrder.forEach((itm) => {
      ids.push(itm.id);
    });
    selectedTemplate?.cardsInputs.forEach((itm) => {
      cardInp.push({ id: itm.id, value: itm.value });
    });
    setItems(ids);
    dispatch(setCardsInputs(cardInp));
  }, [selectedTemplate]);

  useEffect(() => {
    const itemsData: Card[] = [];
    for (let i = 0; i < items.length; i++) {
      const found = selectedTemplate?.cardsOrder.find(
        (itm) => items[i] === itm.id
      );
      if (found) {
        itemsData.push(found);
      }
    }
    dispatch(setCardsOrder(itemsData));
  }, [items, selectedTemplate]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToFirstScrollableAncestor]}
    >
      <EmailTitleCard title={selectedTemplate?.emailTitle ?? ""} />
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <Box overflow="scroll" height="calc( 100% - 4rem )">
          {items.map((id) => {
            const item = selectedTemplate?.cardsOrder.find(
              (itm) => itm.id === id
            );
            const val = selectedTemplate?.cardsInputs.find(
              (itm) => itm.id === id
            )?.value;
            return (
              <Box key={id} py="0.1rem">
                {item && (
                  <EditableItem
                    key={id}
                    itemId={id}
                    item={item}
                    isGrabbed={id === draggedItemId}
                    value={val ?? ""}
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
