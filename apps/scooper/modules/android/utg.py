
import logging
import json
import os
import random
import datetime
import networkx as nx

class UTG(object):
    """ UI transition graph """

    def __init__(self, device, app, random_input) -> None:
        self.logger = logging.getLogger()
        self.device = device
        self.app = app
        self.random_input = random_input

        self.G = nx.DiGraph()
        self.G2 = nx.DiGraph()

        self.transitions = []
        self.effective_event_strs = set()
        self.ineffective_event_strs = set()
        self.explored_state_str = set()
        self.reached_state_strs = set()
        self.reached_activities = set()

        self.first_state = None
        self.last_state = None

        self.start_time = datetime.datetime.now()


    @property
    def first_state_str(self):
        return self.first_state.state_str if self.first_state else None
    
    @property
    def last_state_str(self):
        return self.last_state_str.state_str if self.last_state else None
    
    @property
    def effective_event_count(self):
        return len(self.effective_event_strs)
    
    @property
    def num_transitions(self):
        return len(self.transitions)
    
    def add_transition(self, event, old_state, new_state):
        self.add_node(old_state)
        self.add_node(new_state)

        if not old_state or not new_state:
            return
        
        event_str = event.get_event_str(old_state)
        self.transitions.append((old_state, event, new_state))

        if old_state.state_str == new_state.state_str:
            self.ineffective_event_strs.add(event_str)

            for new_state_str in self.G[old_state.state_str]:
                if event_str in self.G[old_state.state_str][new_state_str]["events"]:
                    self.G[old_state.state_str][new_state_str]["events"].pop(event_str)
            if event_str in self.effective_event_strs:
                self.effective_event_strs.remove(event_str)
            return
        
        self.effective_event_strs.add(event_str)

        if (old_state.state_str, new_state.state_str) not in self.G.edges:
            self.G.add_edge(old_state.state_str, new_state.state_str, events={})
        self.G[old_state.state_str][new_state.state_str]["events"][event_str] = {
            "event": event,
            "id": self.effective_event_count
        }

        if (old_state.structure_str, new_state.structure_str) not in self.G2.edges:
            self.G2.add_edge(old_state.structure_str, new_state.structure_str, events={})
        self.G2[old_state.structure_str][new_state.structure_str]["events"][event_str] = {
            "event": event,
            "id": self.effective_event_count
        }

        self.last_state = new_state
        self.__ouput_utg()

    def remove_transition(self, event, old_state, new_state):
        event_str = event.get_event_str(old_state)
        if (old_state.state_str, new_state.state_str) in self.G.edges:
            events = self.G[old_state.state_str][new_state.state_str]["events"]
            if event_str in events.keys():
                events.pop(event_str)
            if len(event_str) == 0:
                self.G.remove_edge(old_state.state_str, new_state.state_str)

        if (old_state.structure_str, new_state.structure_str) in self.G2.edges:
            events = self.G2[old_state.structure_str][new_state.structure_str]["events"]
            if event_str in events.keys():
                events.pop(event_str)
            if len(events) == 0:
                self.G2.remove_edge(old_state.structure_str, new_state.structure_str)

    def add_node(self, state):
        if not state:
            return
        
        if state.state_str not in self.G.nodes():
            state.save2dir()
            self.G.add_node(state.state_str, state=state)
            if self.first_state is None:
                self.first_state = state

        if state.structure_str not in self.G2.nodes:
            self.G2.add_node(state.strcuture_str, states=[])
        self.G2.nodes[state.structure_str]['states'].append(state)

        if state.foreground_activity.startswith(self.app.package_name):
            self.reached_activities.add(state.foreground_activity)

    def __output_utg(self):
        """
        Output the current UTG to a file
        TODO: Connect this to the node graph editor
        """
        pass

    def is_event_explored(self, event, state):
        event_str = event.get_event_str(state)
        return event_str in self.effective_event_strs or event_str in self.ineffective_event_strs
    
    def is_state_explored(self, state):
        if state.state_str in self.explored_state_str:
            return True
        for possible_event in state.get_possible_input():
            if not self.is_event_explored(possible_event, state):
                return False
        self.explored_state_str.add(state.state_str)
        return True
    
    def is_state_reached(self, state):
        if state.state_str in self.reached_state_strs:
            return True
        self.reached_state_strs.add(state.state_str)
        return False
    
    def get_reachable_states(self, current_state):
        reachable_states = []
        for target_state_str in nx.descendants(self.G, current_state.state_str):
            target_state = self.G.nodes[target_state_str]["state"]
            reachable_states.append(target_state)
        return reachable_states
    
    def get_navigation_steps(self, from_state, to_state):
        if from_state is None or to_state is None:
            return None
        try:
            steps = []
            from_state_str = from_state.state_str
            to_state_str = to_state.state_str
            state_strs = nx.shortest_path(G=self.G, source=from_state_str, target=to_state_str)
            if not isinstance(state_strs, list) or len(state_strs) < 2:
                self.logger.warning(f"Error getting path from {from_state_str} to {to_state_str}")
            start_state_str = state_strs[0]
            for state_str in state_strs[1:]:
                edge = self.G[start_state_str][state_str]
                edge_event_strs = list(edge["events"].keys())
                if self.random_input:
                    random.shuffle(edge_event_strs)

                start_state = self.G.nodes[start_state_str]['state']
                event = edge['events'][edge_event_strs][0]["event"]
                steps.append((start_state, event))
                start_state_str = state_str
            return steps
        except Exception as e:
            print(e)
            self.logger.warning(f"Cannot find a path from {from_state.state_str} to {to_state.state_str}")
            return None
        
    